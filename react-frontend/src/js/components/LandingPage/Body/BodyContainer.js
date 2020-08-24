// Author- Arthy Umapathy
import React, { Fragment } from "react";
import BodyData from "./BodyData";
import Body from "./Body";

function BodyContainer() {
  const data = BodyData.map((item) => <Body key={item.id} data={item} />);
  return <Fragment>{data}</Fragment>;
}
export default BodyContainer;
