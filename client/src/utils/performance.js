// 节流函数 - 限制函数在一定时间内只能执行一次
export const throttle = (func, delay) => {
  let lastCall = 0;
  return function(...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func.apply(this, args);
  };
};

// 防抖函数 - 延迟执行函数，如果在延迟时间内再次调用则重新计时
export const debounce = (func, delay) => {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

// 批量处理状态更新
export const batchUpdate = (updates) => {
  return new Promise(resolve => {
    // 使用requestAnimationFrame确保在下一帧更新
    requestAnimationFrame(() => {
      updates();
      resolve();
    });
  });
};

// 使用requestIdleCallback延迟非关键操作**：
// 添加到performance.js

// 在浏览器空闲时执行任务
export const runWhenIdle = (callback, timeout = 1000) => {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, { timeout });
  } else {
    // 降级处理
    return setTimeout(callback, 1);
  }
};

// 取消空闲任务
export const cancelIdleTask = (id) => {
  if ('cancelIdleCallback' in window) {
    window.cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
};