import * as yup from 'yup';

export const UpdateStatsRequest = yup.object().shape({
  cryptocurrency: yup.number(),
  dollars: yup.number(),
  popularity: yup.number(),
  serverLevel: yup.number(),
  minerLevel: yup.number(),
  instructionsLevel: yup.number(),
  passiveLevel: yup.number(),
  activeLevel: yup.number(),
});
