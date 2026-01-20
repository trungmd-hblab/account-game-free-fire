"use client"
import { Avatar, Group, Text, UnstyledButton } from "@mantine/core";
import classes from './UserButton.module.css';
import { formatNumber } from "@/utils/formatNumber";
import useStore from "@/stores/clientStore";

function UserButton() {
  const { username, diamondBalance, moneyBalance } = useStore((state) => ({
    username: state.username,
    diamondBalance: state.diamondBalance,
    moneyBalance: state.moneyBalance,
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
          <Text c="dimmed" size="xs" mb='xs'>
            {moneyBalance > 0 ? `💰 ${formatNumber(moneyBalance)}đ` : '💰 0đ'}
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
