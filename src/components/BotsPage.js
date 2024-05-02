import React, { useState, useEffect } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";

function BotsPage() {
  const [bots, setBots] = useState([]);
  const [botArmy, setBotArmy] = useState([]);

  useEffect(() => {
    fetchBots();
  }, []);

  const fetchBots = () => {
    fetch("http://localhost:8002/bots")
      .then((response) => response.json())
      .then((data) => setBots(data))
      .catch((error) => console.error("Error fetching bots:", error));
  };

  const enlistBot = (bot) => {
    if (!botArmy.find((b) => b.id === bot.id)) {
      setBotArmy([...botArmy, bot]);
    }
  };

  const releaseBot = (botId) => {
    setBotArmy(botArmy.filter((bot) => bot.id !== botId));
  };

  return (
    <div>
      <YourBotArmy botArmy={botArmy} releaseBot={releaseBot} />
      <BotCollection bots={bots} enlistBot={enlistBot} />
    </div>
  );
}

export default BotsPage;
