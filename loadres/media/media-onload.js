var agent = /Android/.test(navigator.userAgent);

var load_imgs = $(".load_imgs").find("img");
var load_video = ['yq.mp4', 'jke.mp4', 'wym.mp4', 'yyy.mp4', 'kw.mp4', 'yx.mp4', 'lt.mp4'];
var load_audio = ['yq.mp3', 'jke.mp3', 'wym.mp3', 'yyy.mp3', 'kw.mp3', 'yx.mp3', 'lt.mp3'];
var obj = {
	'yq': 1,
	'jke': 2,
	'wym': 3,
	'yyy': 4,
	'kw': 5,
	'yx': 6,
	'lt': 7
};
var loadedImgs = 0;
var video_len = 0;
var audio_len = 0;
var last_name = '';
var phoneNum = '';
var $video = $('video');
var $audio = $('audio');

function loading() {

	load_imgs.on("load", function() {
		loadedImgs++;
		$(".radius").css({
			"width": loadedImgs / (load_imgs.length) * 86 + "%"
		});
		$(".load_text").html(Math.floor(loadedImgs / (load_imgs.length) * 86) + "%");

		if (Math.floor(loadedImgs / (load_imgs.length) * 100) == 100) {
			try {
				for (var j = 0; j < load_audio.length; j++) {
					$audio[j].addEventListener('loadedmetadata', function() {
						audio_len += 2;
						$(".radius").css('width', 86 + audio_len + '%');
						$(".load_text").html(86 + audio_len + '%');
						this.play();
						this.pause();
						//		setTimeout(showPages,1200,1);
						setTimeout(function() {
							showPages(1);
							$(".loading").find("*").remove();
						}, 2000);
					}, false);
					$audio[j].src = baseUrl + '/pm1ssidol201704/audio/' + load_audio[j];
				}

				for (var i = 0; i < load_video.length; i++) {
					$video[i].src = baseUrl + '/pm1ssidol201704/video/' + load_video[i];
					try {
						$video[i].play();
						$video[i].pause();
					} catch (err) {

					}
					enableInlineVideo($video[i]);
					if (agent) {
						$video[i].setAttribute('x5-video-player-type', 'h5');
						$video[i].setAttribute('x5-video-player-fullscreen', 'true');
					}
				}
			} catch (err) {}
		}
	});
	//防止卡死 20秒强制进入
	setTimeout(function() {
		if (loadedImgs < load_imgs.length) {
			loadedImgs = load_imgs.length;
			showPages(1);
			//setTimeout(showpage,1200,1);
			setTimeout(function() {
				$(".loading-mask").find("*").remove();
			}, 2000);
			//$(".index-bgm")[0].play();
		}
	}, 20000);
}



var audio = document.createElement("audio");
audio.src = "490141.m4a";
audio.addEventListener("canplaythrough",
	function() {　　
		$(".yinyu").show();　　
		audio.play();
	},
	false);
audio.load();

function audioplay() {　　
	if (audio.paused) {　　　　
		audio.play();　　
	} else {　　　　
		audio.pause();　　
	}
}