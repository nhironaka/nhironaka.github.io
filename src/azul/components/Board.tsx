import { Flex, type FlexProps, Grid, GridItem } from '@styled/jsx';
import { type ReactNode, useState } from 'react';

interface Props<T> extends Partial<FlexProps> {
  items: Array<Array<T>>;
  renderItem(
    item: T,
    state: {
      hovering: boolean;
      idx: number;
    },
  ): ReactNode;
}
export function Board<T>({ items, renderItem, ...rest }: Props<T>) {
  const [hoveringRow, setHoveringRow] = useState(-1);

  return (
    <Flex flexWrap="nowrap" flexDirection="column" gap="2" {...rest}>
      {items.map((row, rowIdx) => (
        <Grid
          flexWrap="nowrap"
          gridTemplateColumns="repeat(5, 60px)"
          gap="2"
          key={rowIdx}
          onMouseEnter={() => {
            setHoveringRow(rowIdx);
          }}
          onMouseLeave={() => {
            setHoveringRow(-1);
          }}
        >
          {row.map((item, idx) => (
            <GridItem key={idx}>
              {renderItem(item, {
                hovering: hoveringRow === rowIdx,
                idx,
              })}
            </GridItem>
          ))}
        </Grid>
      ))}
    </Flex>
  );
}
