import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.3';
import 'babel-polyfill';

configure({ adapter: new Adapter() });
