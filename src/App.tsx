import React from 'react';
import './App.css';
import Menu from './Menu';

type item = {
  name: string;
  label: string;
  items?: item[];
}

type items = {
  name: string;
  label: string;
  items?: item[];
}

function App() {
  const items: items[] = [
    { name: "home", label: "Home" },
    {
      name: "billing",
      label: "Billing",
      items: [
        { name: "statements", label: "Statements" },
        { name: "reports", label: "Reports" }
      ]
    },
    {
      name: "settings",
      label: "Settings",
      items: [
        { name: "profile", label: "Profile" },
        { name: "insurance", label: "Insurance" },
        {
          name: "notifications",
          label: "Notifications",
          items: [
            { name: "email", label: "Email" },
            {
              name: "desktop",
              label: "Desktop",
              items: [
                { name: "schedule", label: "Schedule" },
                { name: "frequency", label: "Frequency" }
              ]
            },
            { name: "sms", label: "SMS" }
          ]
        }
      ]
    }
  ];

  return (
    <div className="App">
      <Menu items = {items}/>
    </div>
  );
}

export default App;
