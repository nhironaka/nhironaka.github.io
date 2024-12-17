import { Flex, FlexProps, Grid, GridItem } from '@styled/jsx';
import { ReactNode } from 'react';

interface Props<T> extends Partial<FlexProps> {
  items: Array<Array<T>>;
  renderItem(item: T): ReactNode;
}
export function Board<T>({ items, renderItem, ...rest }: Props<T>) {
  return (
    <Flex flexWrap="nowrap" flexDirection="column" gap="2" {...rest}>
      {items.map((row, idx) => (
        <Grid
          flexWrap="nowrap"
          gridTemplateColumns="repeat(5, 60px)"
          gap="2"
          key={idx}
        >
          {row.map((item, idx) => (
            <GridItem key={idx}>{renderItem(item)}</GridItem>
          ))}
        </Grid>
      ))}
    </Flex>
  );
}
