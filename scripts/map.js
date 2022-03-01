let myMap;
const init = () => {
    myMap = new ymaps.Map("map", {
      center: [55.753215, 37.622504],
      zoom: 13,
      controls: []
    });

    let coords = [
      [55.760270, 37.581850],
      [55.76027, 37.647147],
      [55.746258, 37.585098],
      [55.750412, 37.602934],
    ],
    myCollection = new ymaps.GeoObjectCollection({}, {
      draggable: false,
      iconLayout: 'default#image',
      iconImageHref: './images/img/marker.png',
      iconImageSize: [46, 57],
      iconImageOffset: [-35, -52]
    });
  
  for (let i = 0; i < coords.length; i++) {
    myCollection.add(new ymaps.Placemark(coords[i]));
  }
  
  myMap.geoObjects.add(myCollection);
  
  myMap.behaviors.disable('scrollZoom');
}

ymaps.ready(init);







const containerVideo = document.querySelector('.video');
const video = containerVideo.querySelector('video');
const playpause = containerVideo.querySelector('.video__playpause');
const play = containerVideo.querySelector('.video__play');
const controls = containerVideo.querySelector('.video__controls');
const total = containerVideo.querySelector('.video__total');
const progress = containerVideo.querySelector('.video__current');
const dynamic = containerVideo.querySelector('.video__volume-control');
const volume = containerVideo.querySelector('.video__volume-progress');
const volumeProgress = volume.firstElementChild;

playpause.addEventListener('click', togglePlay);
play.addEventListener('click', togglePlay);
video.addEventListener('play', playPause);
video.addEventListener('pause', playPause);
total.addEventListener('click', setCurrentTime);
video.addEventListener('timeupdate', timeUpdate);
dynamic.addEventListener('click', mute);
volume.addEventListener('click', setVolume);

function setVolume(e) {
    volumeProgress.style.width = `${e.offsetX}px`;
    console.log(e.offsetX / volume.clientWidth)
    video.volume = e.offsetX / volume.clientWidth;
    volumeProgress.style.background = "#E01F3D";
}

function mute(e) {
    dynamic.classList.toggle('muted');
    console.log(video.muted)
    video.muted = !video.muted;
    volumeProgress.style.width = 0;
}

function playPause() {
    controls.classList.toggle('paused');
}

function togglePlay() {
    video.paused ?  video.play() : video.pause();
}

function setCurrentTime(e) {
    const offsetX = e.offsetX / total.clientWidth;
    console.log(offsetX * video.duration)
    video.currentTime = offsetX * video.duration;
}

function timeUpdate() {
    console.log('up')
    const progressTime = video.currentTime / video.duration;

    progress.style.width = `${progressTime * total.clientWidth}px`;
    progress.style.background = "#E01F3D";
}