import emitter from '@/methods/emitter';

export default function (res, title = '更新') {
  if (res.data.success) {
    emitter.emit('push-message', {
      style: 'success',
      title: `${title}成功`,
    });
  } else {
    emitter.emit('push-message', {
      style: 'danger',
      title: `${title}失敗`,
    });
  }
}
