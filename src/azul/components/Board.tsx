import { Flex, type FlexProps, Grid, GridItem } from '@styled/jsx';
import { type ReactNode } from 'react';

interface Props<T> extends Partial<FlexProps> {
  items: Array<Array<T>>;
  onHover?(row: number): void;
  renderItem(
    item: T,
    state: {
      idx: number;
      rowIdx: number;
    },
  ): ReactNode;
}
export function Board<T>({
  items,
  renderItem,
  onHover,
  children,
  ...rest
}: Props<T>) {
  return (
    <Flex
      flexWrap="nowrap"
      flexDirection="column"
      gap="2"
      position="relative"
      {...rest}
    >
      {items.map((row, rowIdx) => (
        <Grid
          flexWrap="nowrap"
          gridTemplateColumns="repeat(5, 60px)"
          gap="2"
          key={rowIdx}
          onMouseEnter={() => {
            onHover?.(rowIdx);
          }}
          onMouseLeave={() => {
            onHover?.(-1);
          }}
        >
          {row.map((item, idx) => (
            <GridItem key={idx}>
              {renderItem(item, {
                idx,
                rowIdx,
              })}
            </GridItem>
          ))}
        </Grid>
      ))}
      {children}
    </Flex>
  );
}
