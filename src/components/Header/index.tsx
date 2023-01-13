import { Dispatch, SetStateAction } from "react";
import { Version } from "../../types";
import "./styles.scss";

type Props = {
  version: Version;
  setVersion: Dispatch<SetStateAction<Version>>;
};

const VERSION_LIST: Version[] = ["uuid1", "uuid4"];

export const Header = (props: Props) => {
  const { version, setVersion } = props;

  const renderVersionOption = (text: Version) => (
    <button
      key={text}
      className="select-ver-opt"
      onClick={() => setVersion(version)}
    >
      {version}
    </button>
  );

  return (
    <div className="header">
      <p>{`Random UUID Generator (${version})`}</p>
      <div className="select-ver">
        <p>
          Select version:
          {VERSION_LIST.map((v) => renderVersionOption(v))}
        </p>
      </div>
    </div>
  );
};
