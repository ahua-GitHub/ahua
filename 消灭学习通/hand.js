// 获取视频和画布
const videoElement = document.getElementsByClassName('video')[0];
const canvasElement = document.getElementsByClassName('canvas')[0];
//创建上下文
const canvasCtx = canvasElement.getContext('2d');
//获得飞机
var plane=document.getElementById('plane');
//获取屏幕宽高
var windowWidth=document.body.clientWidth;
var windowHeight=document.body.clientHeight;

//lading元素
const spinner = document.querySelector('.loading');
//loading动画结束后消失
//ontransitionend在css过度完成后触发，在视频加载完成后会给loading的透明度设为0,也就是opacity=0的过渡结束触发
spinner.ontransitionend = () => {
  spinner.style.display = 'none';
};

// 插件手势识别对象
const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.1/${file}`;
  }
});
// hands初始设置
hands.setOptions({
  selfieMode: true, //是否自拍，即是否使用前置摄像头
  maxNumHands: 2,  //最大识别手部数量
  minDetectionConfidence: 0.5,  //识别精度，这个数值越高，则要求图像高评分才能被识别 默认 0.5
  minTrackingConfidence: 0.5 //跟踪速度，数值越高，花费时间越长
});

/**
 * 初始化摄像头，把摄像头拍到画面传给hands
 */
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width:windowWidth,
  height:windowHeight
});
camera.start();

function onResults(results) {
  // 隐藏loading动画
  document.body.classList.add('loaded');

  // Draw the overlays.
  canvasCtx.save();
  // 清空画布
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  // 绘制摄像头捕捉画面
  canvasCtx.drawImage(
    results.image, 0, 0, canvasElement.width, canvasElement.height);

  // 识别结果保存在multiHandLandmarks(每个手的关节信息)和multiHandedness（保存多个手部信息，比如说是左手还是右手）对象中
  // 如果这两个对象不为null，则说明识别成功
  if (results.multiHandLandmarks && results.multiHandedness) {

    // 遍历multiHandLandmarks，获得每个hand的信息
    for (let index = 0; index < results.multiHandLandmarks.length; index++) {
      const classification = results.multiHandedness[index];
      const isRightHand = classification.label === 'Right';
      // 一个手的关节信息
      const landmarks = results.multiHandLandmarks[index];
      // 下标为4的关节就是大拇指,坐标值为宽高的百分比，和画布宽高相乘就得到坐标
      let x = landmarks[4].x * windowWidth;
      let y = landmarks[4].y * windowHeight;

      //把手指坐标赋值非小飞机
      plane.style.left = x - 50 + 'px';
      plane.style.top = y - 40 + 'px';

      // 绘制手部拓扑图
      drawConnectors(
        canvasCtx, landmarks, HAND_CONNECTIONS,
        { color: isRightHand ? '#00FF00' : '#FF0000' }),
        drawLandmarks(canvasCtx, landmarks, {
          color: isRightHand ? '#00FF00' : '#FF0000',
          fillColor: isRightHand ? '#FF0000' : '#00FF00',
          radius: (x) => {
            return lerp(x.from.z, -0.15, .1, 10, 1);
          }
        });
    }
  }
  canvasCtx.restore();
}

hands.onResults(onResults);

