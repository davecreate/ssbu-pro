import * as fromRouter from '@ngrx/router-store';
import { State } from '..';
import { createSelector } from '@ngrx/store';

export const selectRouter = createSelector((state: State) => state.router, value => value);

const {
  selectQueryParams,    // select the current route query params
  selectQueryParam,     // factory function to select a query param
  selectRouteParams,    // select the current route params
  selectRouteParam,     // factory function to select a route param
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = fromRouter.getSelectors(selectRouter);

export const selectRouteDashedId = selectRouteParam('dashedId');

export const selectIsMatchupPage = createSelector(
  selectRouteDashedId,
  selectUrl,
  (characterId, currentUrl) => {
    if (characterId || (currentUrl && currentUrl.toLowerCase().indexOf('credits') > -1)) {
      return true;
    }

    return false;
  }
);

export const selectIsCreditsPage = createSelector(
  selectUrl,
  (currentUrl) => {
    if (currentUrl && currentUrl.toLowerCase().indexOf('credits') > -1) {
      return true;
    }

    return false;
  }
);
