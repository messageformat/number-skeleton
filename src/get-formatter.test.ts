import { getFormatter, getFormatterSource } from './get-formatter'

const tests: {
  [testSet: string]: { [src: string]: [number, string, {}[]?] }
} = {
  examples: {
    percent: [42, '42%'],
    '.00': [42, '42.00'],
    'percent .00': [42, '42.00%'],
    'scale/100': [42, '4,200'],
    'percent scale/100': [42, '4,200%'],
    'measure-unit/length-meter': [42, '42 m'],
    'measure-unit/length-meter unit-width-full-name': [42, '42 meters'],
    'currency/CAD': [42, 'CA$42.00'],
    'currency/CAD unit-width-narrow': [42, '$42.00'],
    'compact-short': [42, '42'],
    'compact-long': [42, '42'],
    'compact-short currency/CAD': [42, 'CA$42'],
    'group-min2': [42, '42', [{}]],
    'sign-always': [42, '+42'],
    'sign-except-zero': [42, '+42'],
    'sign-accounting currency/CAD': [-42, '(CA$42.00)']
  },
  notation: {
    scientific: [4200, '4.2E3'],
    'scientific/sign-always': [4200, '4.2E3', [{ source: 'sign-always' }]],
    'scientific/+ee': [4200, '4.2E3', [{ source: '+ee' }]],
    'scientific/+ee/sign-always': [
      4200,
      '4.2E3',
      [{ source: '+ee/sign-always' }]
    ]
  },
  precision: {
    'precision-increment/0.05': [0.42, '0.42', [{ source: '0.05' }]],
    '.00+': [42, '42.00'],
    '.##': [42.1234, '42.12'],
    '.0#': [42, '42.0'],
    '.##/@@@+': [
      42,
      '42.0',
      [{ stem: 'precision-fraction', source: '.##/@@@+' }]
    ],
    '.00/@##': [42, '42', [{ stem: 'precision-fraction', source: '.00/@##' }]],
    '@@@': [42, '42.0'],
    '@@@+': [42, '42.0'],
    '@##': [42, '42'],
    '@@#': [42, '42']
  },
  'integer-width': {
    'integer-width/+000': [42, '042'],
    'integer-width/##0': [42, '42', [{}]],
    'integer-width/00': [42, '42', [{}]],
    'integer-width/+': [42, '42']
  },
  scale: {
    'scale/100': [42, '4,200'],
    'scale/1E2': [42, '4,200'],
    'scale/0.5': [42, '21']
  },
  misc: {
    ' ': [42, '42'],
    'decimal-always': [42, '42', [{}]],
    latin: [42, '42'],
    'numbering-system/thai': [42, '๔๒'],
    'per-measure-unit/duration-second': [42, '42'],
    'measure-unit/length-meter per-measure-unit/duration-second': [
      42,
      '42 m/s'
    ],
    'precision-integer': [42.123, '42'],
    'rounding-mode-up': [42, '42', [{}]]
  },
  errors: {
    '/': [42, '42', [{ code: 'BAD_STEM', stem: '' }]],
    foo: [42, '42', [{ code: 'BAD_STEM', stem: 'foo' }]],
    currency: [42, '42', [{ code: 'MISSING_OPTION', stem: 'currency' }]],
    'currency/EUR/CAD': [
      42,
      '42',
      [{ code: 'TOO_MANY_OPTIONS', stem: 'currency' }]
    ],
    'engineering/+ee/+ee/+ee': [
      42,
      '42',
      [{ code: 'TOO_MANY_OPTIONS', stem: 'engineering' }]
    ],
    '.00/@@/@@': [
      42,
      '42',
      [
        { code: 'TOO_MANY_OPTIONS', stem: '.00' },
        { stem: 'precision-fraction', source: '.00/@@' }
      ]
    ],
    'notation-simple/foo': [
      42,
      '42',
      [{ code: 'BAD_OPTION', stem: 'notation-simple' }]
    ]
  }
}

for (const [testSet, cases] of Object.entries(tests)) {
  describe(testSet, () => {
    for (const [src, [value, expected, errors]] of Object.entries(cases)) {
      test(src, () => {
        const cb = jest.fn()
        const fmt = getFormatter('en', src, cb)
        const res = fmt(value)
        if (errors) {
          const [stem] = src.split('/', 1)
          const base = { code: 'UNSUPPORTED', stem }
          expect(cb.mock.calls).toMatchObject(
            errors.map(error => [{ ...base, ...error }])
          )
        } else expect(cb).not.toHaveBeenCalled()
        expect(res).toBe(expected)

        const fmtSrc = getFormatterSource('en', src)
        const fmtFn = new Function(`return ${fmtSrc}`)()
        expect(fmtFn(value)).toBe(expected)
      })
    }
  })
}
