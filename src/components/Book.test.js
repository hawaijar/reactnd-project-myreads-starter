import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

import Book from './Book';

describe('Testing the Book component', () => {
  function getBookSample() {
    return {
      book: {
        title: 'The Linux Command Line',
        imageLinks: {
          thumbnail:
            'http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
        },
        authors: ['Alex Banks', 'Denzel Mayengbam'],
      },
      shelf: 'none',
      updateBook: f => f,
    };
  }
  test('Book should be rendered w/o any issues', () => {
    const data = getBookSample();
    const component = shallow(
      <Book shelf={data.shelf} book={data.book} updateBook={data.updateBook} />,
    );
    expect(component).not.toBeNull();
  });
  test('Book should be having a thumbnail', () => {
    const data = getBookSample();
    const component = shallow(
      <Book shelf={data.shelf} book={data.book} updateBook={data.updateBook} />,
    ).find('.book-cover');
    chai
      .expect(component)
      .to.have.style(
        'background-image',
        `url(${data.book.imageLinks.thumbnail})`,
      );
  });
  test('Book should be having the correct title', () => {
    const data = getBookSample();
    const component = shallow(
      <Book shelf={data.shelf} book={data.book} updateBook={data.updateBook} />,
    ).find('.book-title');
    chai
      .expect(component)
      .to.have.text('The Linux Command Line');
  });
    test('Book should be having the correct authors', () => {
        const data = getBookSample();
        const component = shallow(
            <Book shelf={data.shelf} book={data.book} updateBook={data.updateBook} />,
        ).find('.book-authors');
        chai
            .expect(component.at(0))
            .to.have.text('Alex Banks');
        chai
            .expect(component.at(1))
            .to.have.text('Denzel Mayengbam');
    });


});
