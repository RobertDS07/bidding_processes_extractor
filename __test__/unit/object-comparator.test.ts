import { Chance } from 'chance';
import { ObjectComparator } from 'src/domain/object-comparator';

const chance = new Chance();

it('should return a object containing the changes of object2 in comparison of object1', async () => {
  const objectComparator = new ObjectComparator();
  const obj1 = {
    name: chance.name(),
    email: chance.email(),
  };
  const obj2 = {
    name: 'updated name',
    email: obj1.email,
  };

  const diff = objectComparator.getDiffFrom(obj1, obj2);

  expect(diff).not.toHaveProperty('email');
  expect(diff).toHaveProperty('name', obj2.name);
});

it('should throw error if any of parameters is not a object', async () => {
  const objectComparator = new ObjectComparator();

  expect(() => objectComparator.getDiffFrom(null, null)).toThrow();
  expect(() => objectComparator.getDiffFrom(null, {})).toThrow();
  expect(() => objectComparator.getDiffFrom({}, null)).toThrow();
  expect(() => objectComparator.getDiffFrom({}, [])).toThrow();
});
