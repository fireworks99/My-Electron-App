/**
 * 接下来要将 Electron 及其依赖项（NodeJS、Chromium）的版本号输出到网页上
 * 这些信息，可以在主进程中通过Node的全局对象process来访问：process.versions['electron']
 * 但是主进程不能编辑DOM，因为主进程与渲染器进程之间存在上下文隔离（contextIsolation）
 * 可以通过IPC(Inter-Process Communication)机制来完成两进程间的通信
 * 
 * 这里不是通过主进程拿到消息传给渲染器进程，而是依靠预加载脚本(preload script)来完成这件事
 * preload script特点：
 * 1.预加载脚本的运行 早于 渲染器进程的加载
 * 2.可访问渲染器的全局对象：window、document
 * 3.可访问NodeJS环境
 * 基于第二、三个特点，我们可以通过预加载脚本访问NodeJS里的process拿到信息并修改DOM
 */

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})