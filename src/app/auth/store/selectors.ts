import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppSateInterface } from '../../shared/types/app-sate.interface';

const authFeatureSelector = createFeatureSelector<AppSateInterface>('auth');
