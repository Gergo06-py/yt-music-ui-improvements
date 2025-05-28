window.addEventListener("load", () => {
  //#region Declarations
  const TOGGLE_BORDER_RADIUS = "3rem";
  const IMAGE_BORDER_RADIUS = "15px";
  const toggle = document.getElementsByClassName("av-toggle")[0];
  const toggleFirstChild = toggle.children[0];
  const toggleLastChild = toggle.children[toggle.children.length - 1];
  const player = document.getElementById("player");
  const mainPanel = document.getElementById("main-panel");
  const songImage = document.getElementById("song-image");
  const videoPlayer = document.getElementsByClassName("html5-video-player")[0];
  const thumbnail = document.getElementById("thumbnail");
  const image = thumbnail.children[0];
  const songMediaWindow = document.getElementById("song-media-window");
  const playerBarBackground = document.getElementById("player-bar-background");
  const playerBar = document.getElementsByTagName("ytmusic-player-bar")[0];
  const imageShadow = document.createElement("div");
  const styleSheet = document.styleSheets[0];

  const updateImageShadow = () => {
    const currentSrc = image.getAttribute("src");
    if (currentSrc) {
      imageShadow.style.backgroundImage = `url(${currentSrc})`;
      console.log("Image shadow updated with src:", currentSrc);
    } else {
      console.log("Image shadow not updated, src is empty or null.");
    }
  };

  const setBorderRadius = (borderRadius) => {
    image.style.borderRadius = borderRadius;
    songMediaWindow.style.borderRadius = borderRadius;
    player.style.borderRadius = borderRadius;
  };

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "attributes" && mutation.attributeName === "src") {
        updateImageShadow();
      } else if (
        mutation.type === "attributes" &&
        mutation.attributeName === "player-ui-state"
      ) {
        if (mutation.target.getAttribute("player-ui-state") === "MINIPLAYER") {
          imageShadow.style.opacity = "0";
          setBorderRadius(IMAGE_BORDER_RADIUS);
        } else if (
          mutation.target.getAttribute("player-ui-state") === "PLAYER_PAGE_OPEN"
        ) {
          imageShadow.style.opacity = "0.4";
          setBorderRadius(IMAGE_BORDER_RADIUS);
        } else if (
          mutation.target.getAttribute("player-ui-state") === "FULLSCREEN"
        ) {
          setBorderRadius(0);
        }
      }
    }
  });

  //#endregion

  styleSheet.insertRule(`
@keyframes pulse {
	0% {
		scale: 1;
	}
	25% {
		scale: 0.94;
	}
	50% {
		scale: 1.06;
	}
	75% {
		scale: 0.94;
	}
}
`);
  styleSheet.insertRule(`
@keyframes move {
	0% {
		transform: translate(0, 0);
	}
	25% {
		transform: translate(30px, -30px);
	}
	50% {
		transform: translate(-30px, -30px);
    }
    75% {
      	transform: translate(30px, 30px);
    }
    100% {
		transform: translate(0, 0);
    }
}
`);
  //#region Assignment
  imageShadow.id = "image-shadow";
  toggle.style.borderRadius = TOGGLE_BORDER_RADIUS;
  toggleFirstChild.style.borderRadius = TOGGLE_BORDER_RADIUS;
  toggleLastChild.style.borderRadius = TOGGLE_BORDER_RADIUS;
  player.style.borderRadius = IMAGE_BORDER_RADIUS;
  player.style.backgroundColor = "transparent";
  player.style.overflow = "visible";
  player.style.scale = "calc(1 - 60px)";
  mainPanel.style.height = "unset";
  songImage.style.aspectRatio = "1/1";
  songImage.style.padding = "0";
  thumbnail.style.zIndex = "1";
  imageShadow.style.position = "absolute";
  imageShadow.style.top = "-30px";
  imageShadow.style.left = "-30px";
  imageShadow.style.filter = "blur(50px)";
  imageShadow.style.width = "calc(100% + 30px)";
  imageShadow.style.height = "calc(100% + 30px)";
  imageShadow.style.animation =
    "pulse 30s infinite ease-in-out, move 15s infinite ease-in-out";
  imageShadow.style.opacity = "0.4";
  imageShadow.style.transition = "opacity 0.5s ease-in-out";
  imageShadow.style.boxShadow = "inset 0 0 120px rgba(0, 0, 0, 0.5)";
  imageShadow.style.borderRadius = IMAGE_BORDER_RADIUS;
  image.style.boxShadow = "0 0 60px rgba(0, 0, 0, 0.5)";
  image.style.borderRadius = IMAGE_BORDER_RADIUS;
  songMediaWindow.style.borderRadius = IMAGE_BORDER_RADIUS;
  if (videoPlayer) videoPlayer.style.borderRadius = IMAGE_BORDER_RADIUS;
  playerBar.style.background = "transparent";
  playerBar.style.padding = "0 10px";
  playerBar.style.width = "calc(100% - 20px)";
  playerBarBackground.style.borderRadius = "10em";
  playerBarBackground.style.background = "#222c";
  playerBarBackground.style.backdropFilter = "blur(4px)";
  playerBarBackground.style.width = "calc(100% - 20px)";
  playerBarBackground.style.height =
    "calc(var(--ytmusic-player-bar-height) - 20px)";
  playerBarBackground.style.marginBottom = "10px";
  playerBarBackground.style.marginLeft = "10px";

  //#endregion

  updateImageShadow();
  songImage.appendChild(imageShadow);

  observer.observe(image, { attributes: true, attributeFilter: ["src"] });
  observer.observe(player, {
    attributes: true,
    attributeFilter: ["player-ui-state"],
  });

  image.addEventListener("load", () => {
    updateImageShadow();
    if (!imageShadow.parentNode) {
      songImage.appendChild(imageShadow);
    }
  });

  songImage.addEventListener("resize", () => {
    songImage.style.padding = "0";
  });
});
