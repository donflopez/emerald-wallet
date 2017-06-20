webpackJsonp([0],{

/***/ 384:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _bignumber = __webpack_require__(153);

var _bignumber2 = _interopRequireDefault(_bignumber);

var _immutable = __webpack_require__(16);

var _immutable2 = _interopRequireDefault(_immutable);

var _convert = __webpack_require__(42);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Hex Converter', function () {
    it('convert decimal number to hex', function () {
        expect((0, _convert.toHex)(10000000000)).toEqual('0x02540be400');
    });
});

describe('Token Converter', function () {
    it('convert token number to value', function () {
        expect((0, _convert.fromTokens)(1234, '0x08').toString()).toEqual('123400000000');
    });
    it('convert token number to value', function () {
        expect((0, _convert.fromTokens)(1234, '0x08')).toEqual(new _bignumber2.default('123400000000'));
    });
    it('convert token string to value', function () {
        expect((0, _convert.fromTokens)('1234', '0x02').toString()).toEqual('123400');
    });
    it('convert token decimals to value', function () {
        expect((0, _convert.fromTokens)('0.01', '0x08').toString()).toEqual('1000000');
    });
});

var balanceOf = {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    payable: false,
    type: 'function'
};
var transfer = {
    constant: false,
    inputs: [{ name: '_to', type: 'address' }, { name: '_value', type: 'uint256' }],
    name: 'transfer',
    outputs: [{ name: 'success', type: 'bool' }],
    payable: false,
    type: 'function'
};

describe('Function Converter', function () {
    it('get full name from ABI', function () {
        expect((0, _convert.transformToFullName)(balanceOf)).toEqual('balanceOf(address)');
    });
    it('get full name from ABI', function () {
        expect((0, _convert.transformToFullName)(transfer)).toEqual('transfer(address,uint256)');
    });
    it('get function signature from ABI', function () {
        expect((0, _convert.getFunctionSignature)(transfer)).toEqual('a9059cbb');
    });
    it('get function signature from ABI', function () {
        expect((0, _convert.getFunctionSignature)(balanceOf)).toEqual('70a08231');
    });
});

describe('Function to Data Converter', function () {
    var balanceArgs = { _owner: '0xbb0000000aaaa000000000000000000000000bb' };
    var transferArgs = { _to: '0xaa00000000bbbb000000000000000000000000aa', _value: 10 };
    it('convert function to data', function () {
        expect((0, _convert.functionToData)(_immutable2.default.fromJS(balanceOf), balanceArgs)).toEqual('0x70a082310000000000000000000000000bb0000000aaaa000000000000000000000000bb');
    });
    it('convert function to data', function () {
        expect((0, _convert.functionToData)(_immutable2.default.fromJS(transfer), transferArgs)).toEqual('0xa9059cbb000000000000000000000000aa00000000bbbb000000000000000000000000aa000000000000000000000000000000000000000000000000000000000000000a');
    });
    it('ignore bad args', function () {
        var badArgs = { _owner: '0xbb0000000aaaa000000000000000000000000bb', _elaine: 123 };
        expect((0, _convert.functionToData)(_immutable2.default.fromJS(balanceOf), badArgs)).toEqual('0x70a082310000000000000000000000000bb0000000aaaa000000000000000000000000bb');
    });
});

describe('Data to Params Converter', function () {
    var fxn = { inputs: [{ name: '_owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', type: 'uint32' }]
    };
    var data = '000000000000000000000000000000000000000000000000000000000000002a';
    it('convert data to number', function () {
        expect((0, _convert.dataToParams)(_immutable2.default.fromJS(fxn), data).last().value.toString()).toEqual('42');
    });
    it('convert data to number', function () {
        data = '0x000000000000000000000000000000000000000000000000000000000000002a';
        expect((0, _convert.dataToParams)(_immutable2.default.fromJS(fxn), data).last().value.toString()).toEqual('42');
    });
    it('convert data to array of numbers', function () {
        fxn.outputs = [{ name: 'balance', type: 'uint256[]' }];
        data = '00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000003';
        expect((0, _convert.dataToParams)(_immutable2.default.fromJS(fxn), data).last().value.toString()).toEqual('1,2,3');
    });
    it('convert data to array of outputs', function () {
        fxn.outputs = [{ name: 'balance', type: 'uint32' }, { name: 'success', type: 'bool' }];
        data = '0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002a';
        expect((0, _convert.dataToParams)(_immutable2.default.fromJS(fxn), data).size).toEqual(2);
        expect((0, _convert.dataToParams)(_immutable2.default.fromJS(fxn), data).last().value).toEqual(false);
    });
});

describe('Ether converters', function () {
    it('mweiToWei', function () {
        expect((0, _convert.mweiToWei)(0).toString()).toBe('0');
        expect((0, _convert.mweiToWei)(1).toString()).toBe('1000000');
        expect((0, _convert.mweiToWei)(1561).toString()).toBe('1561000000');
        expect((0, _convert.mweiToWei)(8591969).toString()).toBe('8591969000000');
        expect((0, _convert.mweiToWei)(12.345678).toString()).toBe('12345678');
        expect((0, _convert.mweiToWei)(12.3456789).toString()).toBe('12345679');
        expect((0, _convert.mweiToWei)(12.3456780).toString()).toBe('12345678');
        expect((0, _convert.mweiToWei)(12.3456782).toString()).toBe('12345678');
    });

    it('etherToWei', function () {
        expect((0, _convert.etherToWei)(0).toString()).toBe('0');
        expect((0, _convert.etherToWei)(1).toString()).toBe('1000000000000000000');
        expect((0, _convert.etherToWei)(1234).toString(10)).toBe('1234000000000000000000');
        expect((0, _convert.etherToWei)('1234.5678901234567').toString(10)).toBe('1234567890123456700000');
        expect((0, _convert.etherToWei)('1234.567890123456789012').toString(10)).toBe('1234567890123456789012');
        expect((0, _convert.etherToWei)('1234.5678901234567890123').toString(10)).toBe('1234567890123456789012');
        expect((0, _convert.etherToWei)('1234.5678901234567890125').toString(10)).toBe('1234567890123456789012');
        expect((0, _convert.etherToWei)('1234.5678901234567890126').toString(10)).toBe('1234567890123456789013');
    });
});

describe('Gas estimator', function () {
    var from = '0xTESTADDRESSFROM';
    var to = '0xTESTADDRESSTO';
    var value = '0x038d7ea4c68000';
    var gasPrice = '0x04e3b29200';

    it('estimate call', function () {
        var trace = { output: '0x',
            stateDiff: { '0xtestaddressto': { balance: { '*': { from: '0x21526d0318ec01', to: '0x24dfeba7df6c01' } }, code: '=', nonce: '=', storage: {} },
                '0xtestaddressfrom': { balance: { '*': { from: '0x98155a85ae35a03e0', to: '0x9815089c5ee3af3e0' } }, code: '=', nonce: { '*': { from: '0x1f', to: '0x20' } }, storage: {} },
                '0xef24b72ed3164673f4837dd61692657d48d818b8': { balance: { '*': { from: '0x34696a249798214e0c', to: '0x34696bb5ade879de0c' } }, code: '=', nonce: '=', storage: {} } },
            trace: [{ action: { callType: 'call', from: from, gas: '0x0', input: '0x', to: to, value: value }, result: { gasUsed: '0x0', output: '0x' }, subtraces: 0, traceAddress: [], type: 'call' }],
            vmTrace: null };
        var testData = {
            from: from,
            gasPrice: gasPrice,
            gas: '0x5208',
            to: to,
            value: value,
            data: '0x'
        };
        expect((0, _convert.estimateGasFromTrace)(testData, trace)).toEqual(new _bignumber2.default('441000000000000'));
        expect((0, _convert.estimateGasFromTrace)(testData, trace).div(gasPrice).toString(10)).toEqual('21000');
    });
    it('estimate call with lower gas', function () {
        gasPrice = '0xc845880';
        var trace = { stateDiff: {
                '0xtestaddressfrom': { balance: { '*': { from: '0x98155a85ae35a03e0', to: '0x9815216d97617bfe0' } }, code: '=', nonce: { '*': { from: '0x1f', to: '0x20' } }, storage: {} },
                '0xdf7d7e053933b5cc24372f878c90e62dadad5d42': { balance: { '*': { from: '0x491a8fab8806bc7698', to: '0x491a8faf8acf383a98' } }, code: '=', nonce: '=', storage: {} } },
            vmTrace: null };
        var testData = {
            from: from,
            gasPrice: gasPrice,
            gas: '0x5208',
            to: to,
            value: value,
            data: '0x'
        };
        expect((0, _convert.estimateGasFromTrace)(testData, trace)).toEqual(new _bignumber2.default('441000000000000').div(100));
        expect((0, _convert.estimateGasFromTrace)(testData, trace).div(gasPrice).toString(10)).toEqual('21000');
    });
    it('handle null result', function () {
        var testData = {
            from: from,
            gasPrice: gasPrice,
            gas: '0x5208',
            to: to,
            value: value,
            data: '0x'
        };
        expect((0, _convert.estimateGasFromTrace)(testData, null)).toEqual(null);
    });
    it('estimate contract call', function () {
        value = '0x0';
        var trace = { output: '0x',
            stateDiff: { '0x0000000000000000000000000000000000000000': { balance: { '*': { from: '0x26fd2a0d6c08be2d22c', to: '0x26fd29f40784dcf222c' } }, code: '=', nonce: { '*': { from: '0x0', to: '0x1' } }, storage: {} },
                '0xtestaddressto': { balance: { '+': '0x0' }, code: { '+': '0x' }, nonce: { '+': '0x0' }, storage: {} },
                '0xtestaddressfrom': { balance: { '*': { from: '0x98155a85ae35a03e0', to: '0x981541212a54653e0' } }, code: '=', nonce: { '*': { from: '0x1f', to: '0x20' } } } },
            trace: [{ action: { callType: 'call', from: '0x0000000000000000000000000000000000000000', gas: '0x0', input: '0x12065fe0', to: '0x6fc11878336e049855c93da94d89837b4a391f19', value: '0x0' }, result: { gasUsed: '0x0', output: '0x' }, subtraces: 0, traceAddress: [], type: 'call' }],
            vmTrace: null };
        var testData = {
            from: from,
            gasPrice: gasPrice,
            gas: '0x5208',
            to: to,
            value: value,
            data: '0x12065fe0'
        };
        expect((0, _convert.estimateGasFromTrace)(testData, trace)).toEqual(new _bignumber2.default(446712000000000));
    });
});

/***/ }),

/***/ 385:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _validators = __webpack_require__(43);

describe('Field Validators', function () {
    it('valid required', function () {
        expect((0, _validators.required)('abcd')).toBeUndefined();
    });
    it('invalid required', function () {
        expect((0, _validators.required)(undefined)).not.toBeUndefined();
        expect((0, _validators.required)('')).not.toBeUndefined();
    });

    it('valid numbers', function () {
        expect((0, _validators.number)('123')).toBeUndefined();
        expect((0, _validators.number)('123819357191927591012875818575819294757100349')).toBeUndefined();
        expect((0, _validators.number)('687193.9515')).toBeUndefined();
        expect((0, _validators.number)('+1000.00')).toBeUndefined();
        expect((0, _validators.number)('-1000.00')).toBeUndefined();
    });

    it('invalid numbers with other characters', function () {
        expect((0, _validators.number)('123gg')).not.toBeUndefined();
        expect((0, _validators.number)('1238-1935719192')).not.toBeUndefined();
    });
    it('invalid numbers in hex', function () {
        expect((0, _validators.number)('0x51fe')).not.toBeUndefined();
    });
    it('valid positive', function () {
        expect((0, _validators.positive)('1000')).toBeUndefined();
        expect((0, _validators.positive)('+1000')).toBeUndefined();
        expect((0, _validators.positive)('1000.12')).toBeUndefined();
        expect((0, _validators.positive)('+1000.99')).toBeUndefined();
    });
    it('invalid positive', function () {
        expect((0, _validators.positive)('-1000')).not.toBeUndefined();
        expect((0, _validators.positive)('-1000.99')).not.toBeUndefined();
    });

    it('valid address', function () {
        expect((0, _validators.address)('0x6ebeb2af2e734fbba2b58c5b922628af442527ce')).toBeUndefined();
        expect((0, _validators.address)('0x0E7C045110B8dbF29765047380898919C5CB56F4')).toBeUndefined();
    });
    it('invalid address', function () {
        expect((0, _validators.address)('0x6ebeb2af2e734fbba2b58c5b922628af442527')).not.toBeUndefined();
        expect((0, _validators.address)('0E7C045110B8dbF29765047380898919C5CB56F4')).not.toBeUndefined();
    });

    it('valid hex', function () {
        expect((0, _validators.hex)('0x51fe')).toBeUndefined();
        expect((0, _validators.hex)('')).toBeUndefined();
        expect((0, _validators.hex)('aaaCCeeee')).toBeUndefined();
    });
    it('invalid hex', function () {
        expect((0, _validators.hex)('0xgghh51fe')).not.toBeUndefined();
        expect((0, _validators.hex)('aaa0xeeee')).not.toBeUndefined();
    });

    it('valid json', function () {
        expect((0, _validators.isJson)('{"a": 1, "b": 2}')).toBeUndefined();
        expect((0, _validators.isJson)('{"a": [1,2,3], "b": 2}')).toBeUndefined();
        expect((0, _validators.isJson)('["a", 1, "b", 2]')).toBeUndefined();
        expect((0, _validators.isJson)('{"a": {"a": 1, "b": 2}, "b": {"a": 1, "b": {"a": 1, "b": 2}}}')).toBeUndefined();
    });
    it('invalid json', function () {
        expect((0, _validators.isJson)('{a: 1, b: 2}')).not.toBeUndefined();
        expect((0, _validators.isJson)('')).not.toBeUndefined();
        expect((0, _validators.isJson)('{"a", [1,2,3], "b": 2}')).not.toBeUndefined();
        expect((0, _validators.isJson)('"a", 1, "b", 2')).not.toBeUndefined();
    });
});

/***/ }),

/***/ 386:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _immutable = __webpack_require__(16);

var _immutable2 = _interopRequireDefault(_immutable);

var _contractReducers = __webpack_require__(232);

var _contractReducers2 = _interopRequireDefault(_contractReducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('contractReducers', function () {
    it('should set contracts as empty list in case action.contracts undefined', function () {
        var state = (0, _contractReducers2.default)(null, {});
        expect(state.get('contracts')).toEqual(_immutable2.default.List());
        state = (0, _contractReducers2.default)(state, {
            type: 'CONTRACT/SET_LIST'
        });
        expect(state.get('contracts')).toEqual(_immutable2.default.List());
    });
});

/***/ }),

/***/ 427:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(385);

__webpack_require__(384);

__webpack_require__(386);

/***/ })

},[427]);