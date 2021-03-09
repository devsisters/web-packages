export const printImageEasterEgg = (
  imageUrl: string,
  scale = 1,
  messages?: string[]
) => {
  if (
    !/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/g.test(imageUrl)
  ) {
    console.warn("Image URL is incorrect");
    return;
  }
  const img = new Image();
  img.onload = () => {
    const imgStyle = getImgStyle(img.width, img.height, scale);
    printFromImgStyle(imageUrl, imgStyle, messages);
  };
  img.src = imageUrl;
  img.style.background = "url(" + imageUrl + ")";
};

export const printAsciiCIText = (messages: string[] = []) => {
  console.log(
    `%c
 \t██████╗ ███████╗██╗   ██╗███████╗██╗███████╗████████╗███████╗██████╗ ███████╗
 \t██╔══██╗██╔════╝██║   ██║██╔════╝██║██╔════╝╚══██╔══╝██╔════╝██╔══██╗██╔════╝
 \t██║  ██║█████╗  ██║   ██║███████╗██║███████╗   ██║   █████╗  ██████╔╝███████╗
 \t██║  ██║██╔══╝  ╚██╗ ██╔╝╚════██║██║╚════██║   ██║   ██╔══╝  ██╔══██╗╚════██║
 \t██████╔╝███████╗ ╚████╔╝ ███████║██║███████║   ██║   ███████╗██║  ██║███████║
 \t╚═════╝ ╚══════╝  ╚═══╝  ╚══════╝╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚══════╝\n`,
    "color: #fd7622; font-weight: bold;"
  );
  printExtraMessages(messages);
};

const getImgStyle = (width: number, height: number, scale = 1) => {
  return {
    width: width * scale,
    height: height * scale,
    scale,
    string: "+",
    style:
      "font-size: 1px; padding: " +
      Math.floor((height * scale) / 2) +
      "px " +
      Math.floor((width * scale) / 2) +
      "px; line-height: " +
      height * scale +
      "px;",
  };
};

type ImageStyle = ReturnType<typeof getImgStyle>;

const printFromImgStyle = (
  imageUrl: string,
  style: ImageStyle,
  messages: string[] = []
): void => {
  console.log(
    "%c" + style.string,
    style.style +
      "background-image: url(" +
      imageUrl +
      "); background-size: " +
      style.width +
      "px " +
      style.height +
      "px; background-size: 100% 100%; background-repeat: norepeat; color: transparent;"
  );
  printExtraMessages(messages);
};

const printExtraMessages = (messages: string[] = []) => {
  for (let i = 0; i < messages.length; i++) {
    console.log(messages[i]);
  }
};
