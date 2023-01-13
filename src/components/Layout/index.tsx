import { useState } from "react";
import { Version } from "../../types";
import { Header } from "../Header";
import "./styles.scss";
type Props = {
  children: JSX.Element | JSX.Element[];
};
export const Layout = ({ children }: Props) => {
  const [version, setVersion] = useState<Version>("uuid4");

  return (
    <div className="layout">
      <Header version={version} setVersion={setVersion} />
      {children}
    </div>
  );
};
