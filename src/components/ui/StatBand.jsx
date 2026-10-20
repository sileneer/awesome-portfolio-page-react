import React, { Fragment } from 'react';
import { Divider, Stack } from '@mui/material';
import StatItem from '../StatItem';

/**
 * The one "at a glance" figures row.
 *
 * Three different presentations existed for the same idea: a compact row of
 * numbers in the page introductions, a card of icon tiles on the Contact
 * page, and the Home hero band. The compact row and the Contact strip now
 * share this component; the Home band is a hero element and keeps its own
 * layout while reusing the same label and value styles.
 */
const StatBand = ({ items, divided = true, sx }) => (
  <Stack
    direction="row"
    useFlexGap
    divider={divided ? <Divider orientation="vertical" flexItem /> : undefined}
    sx={{
      alignItems: 'center',
      gap: { xs: 3, md: 5 },
      flexWrap: 'wrap',
      ...sx,
    }}
  >
    {items.map((item) => (
      <Fragment key={item.label}>
        <StatItem {...item} />
      </Fragment>
    ))}
  </Stack>
);

export default StatBand;
