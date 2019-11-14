import { UnsupportedError } from './errors'
import { getNumberFormatOptions, NumberFormatOptions } from './nf-options'
import { Skeleton } from './skeleton'

interface TestCase {
  skeleton: Skeleton
  result?: NumberFormatOptions
  unsupported?: string[][]
}

const tests: { [K in keyof Skeleton]: { [name: string]: TestCase } } = {
  unit: {
    'base-unit': {
      skeleton: { unit: { style: 'base-unit' } },
      result: { style: 'decimal' }
    },
    currency: {
      skeleton: { unit: { style: 'currency', currency: 'EUR' } },
      result: { style: 'currency', currency: 'EUR' }
    },
    'measure-unit': {
      skeleton: { unit: { style: 'measure-unit', unit: 'length-meter' } },
      result: { style: 'unit', unit: 'meter' }
    },
    'measure-unit + per-measure-unit': {
      skeleton: {
        unit: { style: 'measure-unit', unit: 'length-meter' },
        unitPer: 'duration-second'
      },
      result: { style: 'unit', unit: 'meter-per-second' }
    },
    percent: {
      skeleton: { unit: { style: 'percent' } },
      result: { style: 'percent' }
    },
    permille: {
      skeleton: { unit: { style: 'permille' } },
      unsupported: [['permille']]
    }
  },

  unitWidth: {
    'unit-width-full-name': {
      skeleton: { unitWidth: 'unit-width-full-name' },
      result: { currencyDisplay: 'name', unitDisplay: 'long' }
    },
    'unit-width-hidden': {
      skeleton: { unitWidth: 'unit-width-hidden' },
      unsupported: [['unit-width-hidden']]
    },
    'unit-width-iso-code': {
      skeleton: { unitWidth: 'unit-width-iso-code' },
      result: { currencyDisplay: 'code' }
    },
    'unit-width-narrow': {
      skeleton: { unitWidth: 'unit-width-narrow' },
      result: { currencyDisplay: 'narrowSymbol', unitDisplay: 'narrow' }
    },
    'unit-width-short': {
      skeleton: { unitWidth: 'unit-width-short' },
      result: { currencyDisplay: 'symbol', unitDisplay: 'short' }
    }
  },

  group: {
    'group-auto': {
      skeleton: { group: 'group-auto' },
      result: { useGrouping: true }
    },
    'group-off': {
      skeleton: { group: 'group-off' },
      result: { useGrouping: false }
    },
    'group-min2': {
      skeleton: { group: 'group-min2' },
      unsupported: [['group-min2']]
    },
    'group-on-aligned': {
      skeleton: { group: 'group-on-aligned' },
      unsupported: [['group-on-aligned']]
    },
    'group-thousands': {
      skeleton: { group: 'group-thousands' },
      unsupported: [['group-thousands']]
    }
  },

  integerWidth: {
    min: {
      skeleton: { integerWidth: { min: 2 } },
      result: { minimumIntegerDigits: 2 }
    },
    max: {
      skeleton: { integerWidth: { min: 0, max: 2, source: 'SRC' } },
      unsupported: [['integer-width', 'SRC']]
    }
  },

  precision: {
    'precision-fraction fraction digits': {
      skeleton: {
        precision: {
          style: 'precision-fraction',
          minFraction: 2,
          maxFraction: 4
        }
      },
      result: { minimumFractionDigits: 2, maximumFractionDigits: 4 }
    },
    'precision-fraction significant digits': {
      skeleton: {
        precision: {
          style: 'precision-fraction',
          minSignificant: 2,
          maxSignificant: 4
        }
      },
      result: { minimumSignificantDigits: 2, maximumSignificantDigits: 4 }
    },
    'precision-fraction both': {
      skeleton: {
        precision: {
          style: 'precision-fraction',
          minFraction: 2,
          maxFraction: 4,
          minSignificant: 3,
          maxSignificant: 6,
          source: 'SRC'
        }
      },
      result: {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
        minimumSignificantDigits: 3,
        maximumSignificantDigits: 6
      },
      unsupported: [['precision-fraction', 'SRC']]
    },
    'precision-integer': {
      skeleton: { precision: { style: 'precision-integer' } },
      result: { maximumFractionDigits: 0 }
    },
    'precision-unlimited': {
      skeleton: { precision: { style: 'precision-unlimited' } },
      result: { maximumFractionDigits: 20 }
    },
    'precision-currency-standard': {
      skeleton: { precision: { style: 'precision-currency-standard' } },
      result: {}
    },
    'precision-currency-cash': {
      skeleton: { precision: { style: 'precision-currency-cash' } },
      unsupported: [['precision-currency-cash']]
    },
    'precision-increment': {
      skeleton: { precision: { style: 'precision-increment', increment: 2 } },
      unsupported: [['precision-increment', '2']]
    }
  },

  notation: {
    'compact-short': {
      skeleton: { notation: { style: 'compact-short' } },
      result: { notation: 'compact', compactDisplay: 'short' }
    },
    'compact-long': {
      skeleton: { notation: { style: 'compact-long' } },
      result: { notation: 'compact', compactDisplay: 'long' }
    },
    'notation-simple': {
      skeleton: { notation: { style: 'notation-simple' } },
      result: { notation: 'standard' }
    },
    scientific: {
      skeleton: { notation: { style: 'scientific' } },
      result: { notation: 'scientific' }
    },
    'scientific sign-accounting': {
      skeleton: {
        notation: {
          style: 'scientific',
          expSign: 'sign-accounting',
          source: 'SRC'
        }
      },
      result: { notation: 'scientific' },
      unsupported: [['scientific', 'SRC']]
    },
    engineering: {
      skeleton: { notation: { style: 'engineering', source: 'STR' } },
      result: { notation: 'engineering' }
    },
    'engineering expDigits': {
      skeleton: {
        notation: { style: 'engineering', expDigits: 2, source: 'SRC' }
      },
      result: { notation: 'engineering' },
      unsupported: [['engineering', 'SRC']]
    }
  },

  sign: {
    'sign-auto': {
      skeleton: { sign: 'sign-auto' },
      result: { signDisplay: 'auto' }
    },
    'sign-always': {
      skeleton: { sign: 'sign-always' },
      result: { signDisplay: 'always' }
    },
    'sign-except-zero': {
      skeleton: { sign: 'sign-except-zero' },
      result: { signDisplay: 'exceptZero' }
    },
    'sign-never': {
      skeleton: { sign: 'sign-never' },
      result: { signDisplay: 'never' }
    },
    'sign-accounting': {
      skeleton: { sign: 'sign-accounting' },
      result: { currencySign: 'accounting' }
    },
    'sign-accounting-always': {
      skeleton: { sign: 'sign-accounting-always' },
      result: { currencySign: 'accounting', signDisplay: 'always' }
    },
    'sign-accounting-except-zero': {
      skeleton: { sign: 'sign-accounting-except-zero' },
      result: { currencySign: 'accounting', signDisplay: 'exceptZero' }
    }
  },

  decimal: {
    'decimal-always': {
      skeleton: { decimal: 'decimal-always' },
      unsupported: [['decimal-always']]
    }
  },

  roundingMode: {
    'rounding-mode-ceiling': {
      skeleton: { roundingMode: 'rounding-mode-ceiling' },
      unsupported: [['rounding-mode-ceiling']]
    },
    'rounding-mode-floor': {
      skeleton: { roundingMode: 'rounding-mode-floor' },
      unsupported: [['rounding-mode-floor']]
    },
    'rounding-mode-down': {
      skeleton: { roundingMode: 'rounding-mode-down' },
      unsupported: [['rounding-mode-down']]
    },
    'rounding-mode-up': {
      skeleton: { roundingMode: 'rounding-mode-up' },
      unsupported: [['rounding-mode-up']]
    },
    'rounding-mode-half-even': {
      skeleton: { roundingMode: 'rounding-mode-half-even' },
      unsupported: [['rounding-mode-half-even']]
    },
    'rounding-mode-half-down': {
      skeleton: { roundingMode: 'rounding-mode-half-down' },
      unsupported: [['rounding-mode-half-down']]
    },
    'rounding-mode-half-up': {
      skeleton: { roundingMode: 'rounding-mode-half-up' },
      unsupported: [['rounding-mode-half-up']]
    },
    'rounding-mode-unnecessary': {
      skeleton: { roundingMode: 'rounding-mode-unnecessary' },
      unsupported: [['rounding-mode-unnecessary']]
    }
  }
}

for (const [testSet, cases] of Object.entries(tests)) {
  if (!cases) continue
  describe(testSet, () => {
    for (const [name, data] of Object.entries(cases)) {
      const { skeleton, result, unsupported } = data
      test(name, () => {
        const cb = jest.fn()
        const opt = getNumberFormatOptions(skeleton, cb)
        expect(opt).toEqual(result || {})
        if (unsupported) {
          const errors = unsupported.map(([stem, source]) => [
            new UnsupportedError(stem, source)
          ])
          expect(cb.mock.calls).toEqual(errors)
        } else expect(cb).not.toHaveBeenCalled()
      })
    }
  })
}
