import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Color, HistoryRecord, Version } from "../../types";
import { NIL as NIL_UUID, v1 as uuidv1, v4 as uuidv4 } from "uuid";
import "./styles.scss";

type Props = {
  version: Version;
  history: HistoryRecord[];
  setHistory: Dispatch<SetStateAction<HistoryRecord[]>>;
};

export const Card = (props: Props) => {
  const { version, history, setHistory } = props;

  const [curUuid, setCurUuid] = useState<string>(NIL_UUID);
  const [uuidTextColor, setUuidTextColor] = useState<Color>("#fff");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (curUuid !== NIL_UUID) {
      updateHistory(curUuid);
    }
  }, [curUuid]);

  const copyToClipboard = (uuid: string) => {
    if (navigator) {
      navigator.clipboard.writeText(uuid);
      setUuidTextColor("#249b58");
      setCopied(true);
      updateHistory(uuid);
    } else {
      throw Error("Navigator does not exist");
    }
  };

  const getRandomUuid = (version: Version, copy?: boolean) => {
    if (!version) {
      throw Error("Invalid version accepted");
    }
    setCopied(false);
    let uuid;
    if (version === "uuid1") {
      uuid = uuidv1();
    } else if (version === "uuid4") {
      uuid = uuidv4();
    }
    if (uuid) {
      setCurUuid(uuid);
      setUuidTextColor("#fff");
      if (copy) {
        copyToClipboard(uuid);
      }
      return;
    }
    throw Error("Getting random uuid failed");
  };

  const updateHistory = (uuidValue: string) => {
    const recordIndex = history.findIndex((h) => h.value === uuidValue);
    // Add copiedDate if already exists
    if (recordIndex !== -1) {
      setHistory((prev: HistoryRecord[]) => {
        const updatedList = [...prev];
        updatedList[recordIndex] = {
          ...updatedList[recordIndex],
          firstCopiedDate: new Date(),
        };
        return updatedList;
      });
    }
    // Add to the list
    else {
      setHistory((prev: HistoryRecord[]) => {
        return [...prev].concat({
          type: version,
          value: uuidValue,
          generatedDate: new Date(),
        });
      });
    }
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
        <p className="card-uuid" style={{ color: uuidTextColor }}>
          {curUuid}
        </p>
      </div>
      {copied && <p className="card-message">Copied ✓</p>}
    </div>
  );
};
