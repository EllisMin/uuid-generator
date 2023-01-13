import { useEffect, useState } from "react";
import { HistoryRecord, Version } from "../../types";
import { Card } from "../Card";
import { Header } from "../Header";
import { History } from "../History";
import "./styles.scss";
type Props = {
  children: JSX.Element | JSX.Element[];
};
export const Layout = ({ children }: Props) => {
  const [version, setVersion] = useState<Version>("uuid4");
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  useEffect(() => {}, [history]);

  return (
    <div className="layout">
      <Header version={version} setVersion={setVersion} />
      <Card version={version} history={history} setHistory={setHistory} />
      <History history={history} />
      {children}
    </div>
  );
};
