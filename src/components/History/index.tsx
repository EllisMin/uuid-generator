import { useState } from "react";
import { HistoryRecord } from "../../types";
import moment from "moment";
import "./styles.scss";

type Props = {
  history: HistoryRecord[];
};

export const History = (props: Props) => {
  const { history } = props;

  const [show, setShow] = useState<boolean>(false);
  const formatString = "YYYY/MM/DD hh:mm:ss";

  const renderHistoryRecords = () => {
    if (history.length < 1) {
      return <p>There is no history</p>;
    }
    return history.map((h, i) => {
      const m1 = moment(h.generatedDate);
      const m2 = h.firstCopiedDate ? moment(h.firstCopiedDate) : undefined;
      return (
        <div key={i} className="history-card-record">
          <p>{`Type:\t${h.type}\nCreated:\t${m1.format(formatString)}\nValue:\t${h.value}\nCopied:\t${
            m2 ? m2.format(formatString) : "Not copied"
          }`}</p>
        </div>
      );
    }).reverse();
  };

  return (
    <div className="history">
      <button
        className="custom-button"
        onClick={() => {
          setShow(!show);
        }}
      >
        {`${show ? "⬇" : "➡"} Show history (${history.length})`}
      </button>
      {show && <div className="history-card">{renderHistoryRecords()}</div>}
    </div>
  );
};
