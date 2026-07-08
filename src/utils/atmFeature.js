const ATM_FEATURE_CUTOFF_DATE = new Date("2026-07-01T00:00:00");

export const canShowAtm = ({ isShowAtm, createdAt }) => {
  if (!isShowAtm || !createdAt) return false;
  return new Date(createdAt) >= ATM_FEATURE_CUTOFF_DATE;
};
