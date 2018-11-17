import assert from 'assert';
import { getImageName } from '../utils';

describe('utils', function () {
    describe('#转换图片名称在前台显示', function () {
        it('20181120-botswana-littleElephant.jpeg should return little elephant', function () {
            assert.equal(getImageName('20181120-botswana-littleElephant.jpeg'), 'little elephant');
        });
        it('20181120-botswana-Elephant.jpeg should return elephant', function () {
            assert.equal(getImageName('20181120-botswana-Elephant.jpeg'), 'elephant');
        });
        it('20181120-帕劳-珊瑚.jpeg should return 珊瑚', function () {
            assert.equal(getImageName('20181120-帕劳-珊瑚.jpeg'), '珊瑚');
        });
    });
});