import { MotionBox } from '@ui/Motion';
import { Color } from './types';

interface Props {
  color: Color;
  residingToken: Color | undefined;
}

export function Square(_props: Props) {
  return <MotionBox></MotionBox>;
}
