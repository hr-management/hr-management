import { SsnFormatPipe } from './ssn-format.pipe';

describe('SsnFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new SsnFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
