import React, { useState } from "react";
import { Card, Checkbox } from "@blueprintjs/core";

export default function({ data: { balances, name } }) {
  const [isChecked, setChecked] = useState(false);

  return (
    <Card
      className="account-card"
      interactive={true}
      onClick={() => setChecked(!isChecked)}>
      <Checkbox checked={isChecked} onChange={() => setChecked(!isChecked)} />
      <div className="account-name">{name}</div>
      <div className="balance-available">{balances.available}</div>
    </Card>
  );
}
