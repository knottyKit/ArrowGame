import { Button } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { BiArrowBack, BiRevision } from "react-icons/bi";
type ModalProps = {
  onSuccess?: () => void;
  onClose?: () => void;
  leaderboards?: [];
  userDetails: { name: string; score: number }[];
};

const LeaderboardsModal = ({
  onSuccess,
  onClose,
  leaderboards,
  userDetails,
}: ModalProps) => {
  useEffect(() => {
    console.log("User Details Passed to Leaderboard:", userDetails);
  }, [userDetails]);
  return (
    <div
      role="dialog"
      tabIndex={-1}
      className="flex flex-col relative z-50 w-full box-border bg-white outline-none mx-1 my-1 sm:mx-6 sm:my-16 max-w-md rounded-md shadow-small overflow-y-hidden"
    >
      <div className="p-4 flex-initial ">
        <Link href={`../home`}>
          <button
            type="button"
            className="text-sm flex gap-1 items-center opacity-75 hover:opacity-100 hover:text-orange-500 transition"
          >
            <BiArrowBack />
            back to main menu
          </button>
        </Link>
      </div>
      <div className="px-4 w-full pb-4">
        <div className="flex justify-center flex-col items-center gap-3">
          <p>your score:</p>
          {userDetails[userDetails.length - 1].score}

          <Button
            radius="md"
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            onClick={() => {
              console.log("clicked btn");
              if (onClose) {
                onClose();
              }
              if (onSuccess) {
                onSuccess();
              }
            }}
          >
            <BiRevision />
            Play Again
          </Button>
        </div>
        <div className="mt-4">
          <h4>Leaderboards:</h4>
          {userDetails.map((user, index) => (
            <p key={index}>
              {user.name}: {user.score}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardsModal;
