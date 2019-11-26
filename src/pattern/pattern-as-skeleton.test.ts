import { Skeleton } from '../types/skeleton'
import { parsePatternAsSkeleton } from './pattern-as-skeleton'

const cases: { [name: string]: { [pattern: string]: Skeleton } } = {
  'Number Patterns': {
    '#,##0.##': {
      group: 'group-auto',
      precision: { style: 'precision-fraction', minFraction: 0, maxFraction: 2 }
    },
    '#,##0.###': {
      group: 'group-auto',
      precision: { style: 'precision-fraction', minFraction: 0, maxFraction: 3 }
    },
    '###0.#####': {
      group: 'group-off',
      precision: { style: 'precision-fraction', minFraction: 0, maxFraction: 5 }
    },
    '###0.0000#': {
      group: 'group-off',
      precision: { style: 'precision-fraction', minFraction: 4, maxFraction: 5 }
    },
    '00000.0000': {
      group: 'group-off',
      integerWidth: { min: 5 },
      precision: { style: 'precision-fraction', minFraction: 4, maxFraction: 4 }
    },
    '#,##0.00 ¤': {
      group: 'group-auto',
      precision: {
        style: 'precision-fraction',
        minFraction: 2,
        maxFraction: 2
      },
      unit: { style: 'currency', currency: 'EUR' }
    }
  },
  'Special Pattern Characters': {
    '-0.0': {
      precision: { style: 'precision-fraction', minFraction: 1, maxFraction: 1 }
    },
    "'-'0.0": {
      affix: { pos: ['-', ''] },
      precision: { style: 'precision-fraction', minFraction: 1, maxFraction: 1 }
    },
    '¤': {
      unit: { style: 'currency', currency: 'EUR' }
    },
    '¤¤': {
      unit: { style: 'currency', currency: 'EUR' },
      unitWidth: 'unit-width-iso-code'
    },
    '¤¤¤': {
      unit: { style: 'currency', currency: 'EUR' },
      unitWidth: 'unit-width-full-name'
    },
    '¤¤¤¤¤': {
      unit: { style: 'currency', currency: 'EUR' },
      unitWidth: 'unit-width-narrow'
    },
    "'#'#": {
      affix: { pos: ['#', ''] }
    },
    "# o''clock": {
      affix: { pos: ['', " o'clock"] }
    },
    '#,##0.00;(#,##0.00)': {
      affix: { pos: ['', ''], neg: ['(', ')'] },
      group: 'group-auto',
      precision: {
        style: 'precision-fraction',
        minFraction: 2,
        maxFraction: 2
      },
      sign: 'sign-never'
    },
    '0.00': {
      precision: { style: 'precision-fraction', minFraction: 2, maxFraction: 2 }
    },
    '0.00;': {
      precision: { style: 'precision-fraction', minFraction: 2, maxFraction: 2 }
    },
    '0.00;-0.00': {
      affix: { pos: ['', ''], neg: ['-', ''] },
      precision: {
        style: 'precision-fraction',
        minFraction: 2,
        maxFraction: 2
      },
      sign: 'sign-never'
    },
    '0.00;0.00': {
      affix: { pos: ['', ''], neg: ['', ''] },
      precision: {
        style: 'precision-fraction',
        minFraction: 2,
        maxFraction: 2
      },
      sign: 'sign-never'
    },
    '0.00; -0.00': {
      affix: { pos: ['', ''], neg: [' -', ''] },
      precision: {
        style: 'precision-fraction',
        minFraction: 2,
        maxFraction: 2
      },
      sign: 'sign-never'
    },
    '0.00+;0.00-': {
      affix: { pos: ['', '+'], neg: ['', '-'] },
      precision: {
        style: 'precision-fraction',
        minFraction: 2,
        maxFraction: 2
      },
      sign: 'sign-never'
    },
    '#,##0.0#;(#)': {
      affix: { pos: ['', ''], neg: ['(', ')'] },
      group: 'group-auto',
      precision: {
        style: 'precision-fraction',
        minFraction: 1,
        maxFraction: 2
      },
      sign: 'sign-never'
    },
    '#,##,##0': {
      group: 'group-auto'
    },
    '#,##0.###,#': {
      group: 'group-auto',
      precision: { style: 'precision-fraction', minFraction: 0, maxFraction: 4 }
    },
    '##,##0.###': {
      group: 'group-auto',
      precision: { style: 'precision-fraction', minFraction: 0, maxFraction: 3 }
    },
    '#,###.##': {
      group: 'group-auto',
      precision: { style: 'precision-fraction', minFraction: 0, maxFraction: 2 }
    },
    '¤ #,##0.00': {
      group: 'group-auto',
      precision: {
        style: 'precision-fraction',
        minFraction: 2,
        maxFraction: 2
      },
      unit: { style: 'currency', currency: 'EUR' }
    }
  },
  'Scientific Notation': {
    '0.###E0': {
      integerWidth: { min: 1 },
      notation: { style: 'scientific', expDigits: 1, expSign: 'sign-auto' },
      precision: { style: 'precision-fraction', maxSignificant: 4 }
    },
    '0.###E0 m/s': {
      affix: { pos: ['', ' m/s'] },
      integerWidth: { min: 1 },
      notation: { style: 'scientific', expDigits: 1, expSign: 'sign-auto' },
      precision: { style: 'precision-fraction', maxSignificant: 4 }
    },
    '0.###E+0': {
      integerWidth: { min: 1 },
      notation: { style: 'scientific', expDigits: 1, expSign: 'sign-always' },
      precision: { style: 'precision-fraction', maxSignificant: 4 }
    },
    '00.###E0': {
      integerWidth: { min: 2 },
      notation: { style: 'scientific', expDigits: 1, expSign: 'sign-auto' },
      precision: {
        style: 'precision-fraction',
        minSignificant: 2,
        maxSignificant: 5
      }
    },
    '##0.####E0': {
      integerWidth: { min: 1, max: 3 },
      notation: { style: 'scientific', expDigits: 1, expSign: 'sign-auto' },
      precision: { style: 'precision-fraction', maxSignificant: 5 }
    },
    '#.##E0': {
      integerWidth: { min: 1, max: 1 },
      notation: { style: 'scientific', expDigits: 1, expSign: 'sign-auto' },
      precision: { style: 'precision-fraction', maxSignificant: 3 }
    },
    '#.0#E0': {
      integerWidth: { min: 1, max: 1 },
      notation: { style: 'scientific', expDigits: 1, expSign: 'sign-auto' },
      precision: { style: 'precision-fraction', maxSignificant: 2 }
    },
    '0E0': {
      integerWidth: { min: 1 },
      notation: { style: 'scientific', expDigits: 1, expSign: 'sign-auto' },
      precision: { style: 'precision-fraction', maxSignificant: 1 }
    },
    '#E0': {
      integerWidth: { min: 1, max: 1 },
      notation: { style: 'scientific', expDigits: 1, expSign: 'sign-auto' }
    },
    '###E0': {
      integerWidth: { min: 1, max: 3 },
      notation: { style: 'scientific', expDigits: 1, expSign: 'sign-auto' }
    }
  },
  'Significant Digits': {
    '@@@': {
      precision: {
        style: 'precision-fraction',
        minSignificant: 3,
        maxSignificant: 3
      }
    },
    '@##': {
      precision: {
        style: 'precision-fraction',
        minSignificant: 1,
        maxSignificant: 3
      }
    },
    '@00': {
      integerWidth: { min: 2 },
      precision: {
        style: 'precision-fraction',
        minSignificant: 1,
        maxSignificant: 1
      }
    },
    '@.###': {
      precision: {
        style: 'precision-fraction',
        minSignificant: 1,
        maxSignificant: 1
      }
    },
    '#,#@#': {
      group: 'group-auto',
      precision: {
        style: 'precision-fraction',
        minSignificant: 1,
        maxSignificant: 2
      }
    },
    '@@###E0': {
      integerWidth: { min: 1, max: 1 },
      notation: { style: 'scientific', expDigits: 1, expSign: 'sign-auto' },
      precision: {
        style: 'precision-fraction',
        minSignificant: 2,
        maxSignificant: 5
      }
    }
  },
  Padding: {
    '$*x#,##0.00': {
      affix: { pos: ['$', ''] },
      group: 'group-auto',
      precision: { style: 'precision-fraction', minFraction: 2, maxFraction: 2 }
    },
    "* #0 o''clock": {
      affix: { pos: ['', " o'clock"] }
    }
  },
  Rounding: {
    '#,#50': {
      group: 'group-auto',
      integerWidth: { min: 2 },
      precision: { style: 'precision-increment', increment: 50 }
    },
    '#,##0.05': {
      group: 'group-auto',
      precision: { style: 'precision-increment', increment: 0.05 }
    }
  },
  'Unsupported Features & other oddities': {
    "# foo % 'bar'''": {
      affix: { pos: ['', " bar'"] },
      unit: { style: 'percent' }
    },
    'foo ‰ bar 0E*': {
      affix: { pos: ['foo ', 'E*'] },
      unit: { style: 'permille' }
    },
    '%+#;foo- % -bar # baz % qux': {
      affix: { pos: ['', ''], neg: ['foo- ', ' qux'] },
      sign: 'sign-never',
      unit: { style: 'percent' }
    },
    '2E0': {
      integerWidth: { min: 1 },
      notation: { style: 'scientific', expDigits: 1, expSign: 'sign-auto' },
      precision: { style: 'precision-increment', increment: 2 }
    }
  }
}

for (const [name, tests] of Object.entries(cases)) {
  describe(name, () => {
    for (const [pattern, expected] of Object.entries(tests)) {
      test(pattern, () => {
        const skeleton = parsePatternAsSkeleton(pattern, 'EUR')
        expect(skeleton).toEqual(expected)
      })
    }
  })
}

const errors = {
  '0#': 'Pattern has # after integer digits',
  '0.#0': 'Pattern has digits after # in fraction',
  '@#@': 'Pattern sets multiple precisions',
  '0.0.0': 'Pattern has more than one decimal separator',
  '0E0E00': 'Pattern has more than one exponent',
  '#,##0.0E0': 'Exponential patterns may not contain grouping separators',
  '¤¤': 'The ¤ pattern requires a currency',
  '¤¤¤¤': 'Invalid number (4) of ¤ chars in pattern',
  "0'foo": 'Unterminated quoted literal in pattern: foo'
}

describe('Errors', () => {
  for (const [pattern, error] of Object.entries(errors)) {
    test(pattern, () => {
      expect(() => parsePatternAsSkeleton(pattern)).toThrow(error)
    })
  }
})
