import deepDiff, { diff } from 'deep-diff';

export class ObjectComparator {
  constructor() {}

  private getFormattedObject<T>(diffArray: deepDiff.Diff<T, T>[]) {
    const formattedObject = {} as T;
    diffArray.forEach((diff) => {
      const path = diff.path.join('.');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const value = diff.rhs;

      formattedObject[path] = value;
    });
    return formattedObject;
  }

  private validaIfIsObject(input: any) {
    const isObject =
      typeof input === 'object' && input !== null && !Array.isArray(input);
    return isObject;
  }

  getDiffFrom<T>(source: T, target: T): Partial<T> {
    const hasValidParams =
      this.validaIfIsObject(source) && this.validaIfIsObject(target);
    if (!hasValidParams) {
      throw new Error('Invalid param passed to function getDiffFrom');
    }

    const diffResult = diff(source, target);
    if (!diffResult) {
      return null;
    }
    const updatedObject = this.getFormattedObject<T>(diffResult);
    return updatedObject;
  }
}
