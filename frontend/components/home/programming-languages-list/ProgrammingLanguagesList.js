import Image from "next/image";

function ProgrammingLanguagesList() {
  const style = {
    padding: 10,
    height: 50,
    width: 50,
  };

  return (
    <div className="flex flex-row ">
      <Image
        src={"/assets/javascript.svg"}
        alt="JavaScript Icon"
        width={style.width}
        height={style.height}
      />

      <Image
        src={"/assets/react.svg"}
        alt="Reactjs Icon"
        width={style.width}
        height={style.height}
      />

      <Image
        src={"/assets/typescript.svg"}
        alt="TypeScript Icon"
        width={style.width}
        height={style.height}
      />

      <Image
        src={"/assets/ruby.svg"}
        alt="Ruby Icon"
        width={style.width}
        height={style.height}
      />

      <Image
        src={"/assets/java.svg"}
        alt="Javat Icon"
        width={style.width}
        height={style.height}
      />

      <Image
        src={"/assets/python.svg"}
        alt="Python Icon"
        width={style.width}
        height={style.height}
      />

      <Image
        src={"/assets/go.svg"}
        alt="Go Icon"
        width={style.width}
        height={style.height}
      />

      <Image
        src={"/assets/blank-file.svg"}
        alt="Blank File Icon"
        width={style.width}
        height={style.height}
      />

      <Image
        src={"/assets/html5.svg"}
        alt="Html Icon"
        width={style.width}
        height={style.height}
      />

      <Image
        src={"/assets/css3.svg"}
        alt="Css Icon"
        width={style.width}
        height={style.height}
      />

      <Image
        src={"/assets/php.svg"}
        alt="Phtp Icon"
        width={style.width}
        height={style.height}
      />
    </div>
  );
}

export default ProgrammingLanguagesList;
