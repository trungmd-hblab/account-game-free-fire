"use client"
import { Avatar, Group, Text, UnstyledButton } from "@mantine/core";
import classes from './UserButton.module.css';
import { formatNumber } from "@/utils/formatNumber";
import useStore from "@/stores/clientStore";

function UserButton() {
  const { username, diamondBalance, atmBalance, cardBalance, promotionBalance } = useStore((state) => ({
    username: state.username,
    diamondBalance: state.diamondBalance,
    atmBalance: state.atmBalance,
    cardBalance: state.cardBalance,
    promotionBalance: state.promotionBalance,
  }));

  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar
          src='/images/avatar-default.png'
          ml='8px'
          p={2}
          alt="avatar tài khoản"
          radius="xl"
        />
        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500} mb='xs'>
            {username || 'Người dùng'}
          </Text>
          <Text c="dimmed" size="xs">
            {`🏦 ATM: ${formatNumber(atmBalance || 0)}đ`}
          </Text>
          <Text c="dimmed" size="xs">
            {`💳 Thẻ: ${formatNumber(cardBalance || 0)}đ`}
          </Text>
          <Text c="dimmed" size="xs" mb='xs'>
            {`🎁 KM: ${formatNumber(promotionBalance || 0)}đ`}
          </Text>
          <Text c="dimmed" size="xs">
            {diamondBalance > 0 ? `💎 ${formatNumber(diamondBalance)}` : '💎 0'}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  );
}

export default UserButton;
