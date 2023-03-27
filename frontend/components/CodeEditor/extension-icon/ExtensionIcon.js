import Image from "next/image";

function ExtensionIcon(props) {
  const style = {
    height: 15,
    width: 15,
  };

  switch (props.extension) {
    case "js":
      return (
        <Image
          src={"/assets/javascript.svg"}
          alt="JavaScript Icon"
          width={style.width}
          height={style.height}
        />
      );

    case "reactjs":
      return (
        <Image
          src={"/assets/react.svg"}
          alt="Reactjs Icon"
          width={style.width}
          height={style.height}
        />
      );

    case "typescript":
      return (
        <Image
          src={"/assets/typescript.svg"}
          alt="TypeScript Icon"
          width={style.width}
          height={style.height}
        />
      );

    case "ruby":
      return (
        <Image
          src={"/assets/ruby.svg"}
          alt="Ruby Icon"
          width={style.width}
          height={style.height}
        />
      );

    case "java":
      return (
        <Image
          src={"/assets/java.svg"}
          alt="Javat Icon"
          width={style.width}
          height={style.height}
        />
      );

    case "python":
      return (
        <Image
          src={"/assets/python.svg"}
          alt="Python Icon"
          width={style.width}
          height={style.height}
        />
      );

    case "go":
      return (
        <Image
          src={"/assets/go.svg"}
          alt="Go Icon"
          width={style.width}
          height={style.height}
        />
      );

    case "html":
      return (
        <Image
          src={"/assets/html5.svg"}
          alt="Html Icon"
          width={style.width}
          height={style.height}
        />
      );

    case "css":
      return (
        <Image
          src={"/assets/css3.svg"}
          alt="Css Icon"
          width={style.width}
          height={style.height}
        />
      );

    case "php":
      return (
        <Image
          src={"/assets/php.svg"}
          alt="Phtp Icon"
          width={style.width}
          height={style.height}
        />
      );

    default:
      return (
        <Image
          src={"/assets/blank-file.svg"}
          alt="Blank File Icon"
          width={style.width}
          height={style.height}
        />
      );
  }
}

export default ExtensionIcon;
