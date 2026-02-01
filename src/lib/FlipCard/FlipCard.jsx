import { useEffect, useRef, useState } from "react";
import classes from "../LuckyWheel/LuckyWheel.module.css";
import { Alert, Box, Image, Modal } from "@mantine/core";

const FlipCard = ({
  account,
  setStartGame,
  startGame,
  indexPrize,
  endGame,
  setEndGame,
}) => {
  const [prizes, setPrizes] = useState(account?.prizes || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalTimeoutRef = useRef(null);

  const urlImgBackCard = account?.coverImageUrl;

  const handleFlipCard = (index) => {
    if (startGame == true && indexPrize != null) {
      const winningPrize = account.prizes[indexPrize.index];
      const remainingPrizes = [...account.prizes];
      remainingPrizes.splice(indexPrize.index, 1);

      for (let i = remainingPrizes.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [remainingPrizes[i], remainingPrizes[randomIndex]] = [
          remainingPrizes[randomIndex],
          remainingPrizes[i],
        ];
      }

      remainingPrizes.splice(index, 0, winningPrize);
      setPrizes(remainingPrizes);
      setStartGame(false);
      setEndGame(true);
      modalTimeoutRef.current = setTimeout(() => {
        setIsModalOpen(true);
      }, 1000);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    return () => {
      if (modalTimeoutRef.current) {
        clearTimeout(modalTimeoutRef.current);
      }
    };
  }, []);

  const renderImgs = () => {
    return prizes.map((prize, index) => {
      if (!prize?.imageUrl) return <></>;
      return (
        <div
          key={prize?.name}
          className={startGame ? classes["animate_img_back_card-wapper"] : ""}
          onClick={() => handleFlipCard(index)}
        >
          {
            urlImgBackCard && prize?.imageUrl && 
          <Image
            className={
              startGame
                ? classes["animate_img_back_card"]
                : endGame
                  ? classes["animate_img_back_card_end"]
                  : ""
            }
            src={startGame ? urlImgBackCard : prize?.imageUrl}
          />
          }
        </div>
      );
    });
  };
  return (
    <>
      <div className={classes["lucky-wheel-container"]}>
        <div className={classes["grid-container"]}>{renderImgs()}</div>
      </div>
      <Modal
        opened={isModalOpen}
        onClose={handleModalClose}
        title="Chúc mừng"
        size={400}
        centered
      >
        <Alert color="blue">
          <Box className="flex flex-col items-center justify-center">
            <Image
              src= {indexPrize?.imageUrl ? indexPrize?.imageUrl : "/images/success.png" }  
              alt="thong_bao_thanh_cong"
              className="w-40"
            />
            <Box className="text-center">
              <span mt={10} className="inline">
                Chúc mừng bạn đã quay trúng thưởng {indexPrize?.name}.
              </span>
              {indexPrize?.type == "diamond" ? (
                <span className="inline">
                  {" "}
                  Số kim cương của bạn đã được cập nhật.
                </span>
              ) : (
                <span className="inline">
                  {" "}
                  Xem chi tiếp phần thưởng tại{" "}
                  <strong
                    onClick={() => router.push("/tai_khoan/tai_khoan_da_mua")}
                    className="font-medium underline cursor-pointer"
                  >
                    đây.
                  </strong>
                </span>
              )}
            </Box>
          </Box>
        </Alert>
      </Modal>
    </>
  );
};

export default FlipCard;
