import { useState } from "react";
import { Version } from "../../types";
import { NIL as NIL_UUID, v1 as uuidv1, v4 as uuidv4 } from "uuid";
import "./styles.scss";

type Props = { version: Version };

export const Card = (props: Props) => {
  const { version } = props;
  const [curUuid, setCurUuid] = useState<string>(NIL_UUID);

  const copyToClipboard = (text: string) => {
    if (navigator) {
      navigator.clipboard.writeText(text);
    } else {
      throw Error("Navigator does not exist");
    }
  };

  const getRandomUuid = (version: Version, copy?: boolean) => {
    if (!version) {
      throw Error("Invalid version accepted");
    }
    let uuid;
    if (version === "uuid1") {
      uuid = uuidv1();
    } else if (version === "uuid4") {
      uuid = uuidv4();
    }
    if (uuid) {
      setCurUuid(uuid);
      if (copy) {
        copyToClipboard(uuid);
      }
      return;
    }
    throw Error("Getting random uuid failed");
  };

  return (
    <div className="card">
      <div className="card-btn-container">
        <button
          className="custom-button"
          onClick={() => getRandomUuid(version)}
        >
          Generate
        </button>
        <button
          className="custom-button"
          onClick={() => getRandomUuid(version, true)}
        >
          Generate & Copy
        </button>
        <button
          className="custom-button"
          onClick={() => copyToClipboard(curUuid)}
        >
          Copy
        </button>
      </div>
      <div className="card-uuid-container">
        <p className="card-uuid">{curUuid}</p>
      </div>
    </div>
  );
};
