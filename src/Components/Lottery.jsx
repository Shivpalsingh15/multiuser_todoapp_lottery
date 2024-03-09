import { useState } from "react";
import { getTicket, sum } from "./helper";
import styles from "./btn.module.css";
export default function Lottery() {
  const [ticket, setTicket] = useState(getTicket(3));
  let isWinning = sum(ticket) % 5 == 0;

  let Buyticket = () => {
    setTicket(getTicket(3));
  };

  return (
    <div className="mt-[10%] h-full flex flex-col justify-center items-center">
      <div className="border border-black w-[30%] rounded-lg p-5 gap-5 flex flex-col justify-center items-center">
        <h1>Lottery Game!</h1>
        <div className="ticket font-semibold text-5xl">
          <span>{ticket[0]}</span>
          <span>{ticket[1]}</span>
          <span>{ticket[2]}</span>
        </div>
        <h3
          className={
            isWinning
              ? "text-green-700 text-2xl animate-bounce"
              : "text-red-700 text-2xl animate-bounce"
          }
        >
          {isWinning
            ? "Congratulations! You won 🎉🎉"
            : "Better Luck Next Time😂😂"}
        </h3>
        <button className={styles.meribtn} onClick={Buyticket}>
          Buy Tickets
        </button>
      </div>
    </div>
  );
}
