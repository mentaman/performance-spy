declare module 'redux-thunk-original' {

}
declare module 'reselect-original' {
    export function defaultMemoize(): void;
    export function createSelector(): void;
    export function createSelectorCreator(): void;
}
declare module "re-reselect-original" {
    export type Selector<S, R> = (state: S, ...args: any[]) => R;
    export type Resolver<S> = (state: S, ...args: any[]) => number | string;
    export type OutputSelector<S, T> = (state: S, ...args: any[]) => T;
    export type CachedSelector<S, T> = (resolver: Resolver<S>) => OutputSelector<S, T>;

    // Two selectors
    export function createCachedSelector<S, R1, R2, T>(
        selectors: [
            Selector<S, R1>,
            Selector<S, R2>
        ],
        combiner: (res1: R1, res2: R2) => T,
    ): CachedSelector<S, T>;

    // Three selectors
    export function createCachedSelector<S, R1, R2, R3, T>(
        selectors: [
            Selector<S, R1>,
            Selector<S, R2>,
            Selector<S, R3>
        ],
        combiner: (res1: R1, res2: R2, res3: R3) => T,
    ): CachedSelector<S, T>;

    // Four selectors
    export function createCachedSelector<S, R1, R2, R3, R4, T>(
        selectors: [
            Selector<S, R1>,
            Selector<S, R2>,
            Selector<S, R3>,
            Selector<S, R4>
        ],
        combiner: (res1: R1, res2: R2, res3: R3, res4: R4) => T,
    ): CachedSelector<S, T>;

    // Five selectors
    export function createCachedSelector<S, R1, R2, R3, R4, R5, T>(
        selectors: [
            Selector<S, R1>,
            Selector<S, R2>,
            Selector<S, R3>,
            Selector<S, R4>,
            Selector<S, R5>
        ],
        combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T,
    ): CachedSelector<S, T>;
  }