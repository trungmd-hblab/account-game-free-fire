'use client';
import { useGetDetailLuckyWheel, useGetDetailLuckyWheelWinner } from "@/api/client/luckywheel";
import ModalConfirmLuckyWheel from "@/components/ModalConfirmLuckyWheel/ModalConfirmLuckyWheel";
import SliderCardsWheel from "@/components/SliderCardsWheel/SliderCardsWheel";
import FlipCard from "@/lib/FlipCard/FlipCard";
import LuckyWheel from "@/lib/LuckyWheel/LuckyWheel";
import { formatNumber } from "@/utils/formatNumber";
import { Card, Text, Title } from "@mantine/core";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function PageDetailLuckyWheel() {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [startGame, setStartGame] = useState(false);
  const [endGame, setEndGame] = useState(false);
  const [indexPrize, setIndexPrize] = useState(null);

  const { data, isLoading, isError, error } = useGetDetailLuckyWheel(id);
  const { data: luckyWheelWinner } = useGetDetailLuckyWheelWinner();

  useEffect(() => {
    setAccount(data?.result);
  }, [data])
 
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row lg:flex-row gap-4 justify-between items-start">
          {account &&
            <div className="bg-cover bg-center rounded-lg p-4 flex justify-center items-center w-full md:w-7/10 lg:w-3/5" style={{ backgroundImage: 'url(/images/bg-default.png)' }}>
              {
                account?.type == "pick"
                ? 
                <FlipCard account={account} setStartGame={setStartGame} startGame={startGame}  endGame={endGame} setEndGame={setEndGame} indexPrize={indexPrize}/>
                : 
                <LuckyWheel
                wheelImage={account?.coverImageUrl}
                pointerImage="/images/image.png"
                account={account}
              />
              }
            </div>
          }
          <div className="w-full md:w-3/10 lg:w-2/5">
            <Card className="card shadow-md mb-4">
              <Text fw={600} mb="sm">
                ️🏆 Top quay thưởng
              </Text>
              <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
                {
                  luckyWheelWinner?.result?.map((item, index) => {
                    return (
                      <div key={index} className="flex gap-2">
                        <Text style={{fontWeight:'500'}}> {item.username.slice(0, -3) + '*****'}: </Text>
                        <Text>{item.note}</Text>
                      </div>
                    )
                  })
                }
              </div>
            </Card>

            <div className="mb-4">
              <Text fw={600} size="xl">
                {account?.name}
              </Text>
            </div>

            {account &&
              <>
                <div className="mb-4">
                  <Text className="text-green-700 font-bold text-2xl">
                    {formatNumber(account?.fee?.value)}đ
                  </Text>
                </div>
                <div>
                  <ModalConfirmLuckyWheel account={account}  type={account?.type} setStartGame={setStartGame} setEndGame={setEndGame} setIndexPrize={setIndexPrize}/>
                </div>
              </>
            }
          </div>
        </div>
        <div className="mt-16 border-t border-gray-300">
          <Title order={3} my={6}>
            Các vòng quay khác
          </Title>
          <SliderCardsWheel />
        </div>
      </div>
    </>
  );
}

export default PageDetailLuckyWheel;
