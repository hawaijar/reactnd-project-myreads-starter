import { shallow } from 'enzyme';
import React from 'react';
import Books from '../../test/SampleBooks';
import SearchPage from './SearchPage';
import Book from './Book';

describe('Testing the Search component', () => {
  test('whether the Search component renders all the books correctly', () => {
    const bookCount = Books.length;
    const component = shallow(<SearchPage queryResult={Books} />);
    expect(component.find(Book).length).toEqual(bookCount);
    console.log('bookCount:', bookCount);
  });
});
