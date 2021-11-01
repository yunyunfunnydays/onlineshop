// 讓此功能可被不同的元件使用
import mitt from 'mitt';

const emitter = mitt();
export default emitter;
