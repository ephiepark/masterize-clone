// @flow

export type HistoryRecord = {
  level: number,
  noteQuestioned: string,
  noteUserAnswer: string,
};

export type Round = {
  noteOptions: Array<string>,
  noteQuestioned: string,
  roundId: number,
};

export type PitchState = {
  score: number,
  level: number,
  history: Array<HistoryRecord>,
  round: Round,
};

export type User = {
  displayName: string,
  photoURL: string,
};

export type AuthState = {
  user: User,
};

export type State = {
  auth: AuthState,
  pitch: PitchState,
};

export type GetState = () => State;
