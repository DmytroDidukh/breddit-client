type PossibleDate = Date | string | number;

class DateUtils {
    static formatToLongDate(date: PossibleDate): string {
        return this.formatToLocaleDateString(date, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    static formatToShortDate(date: PossibleDate): string {
        return this.formatToLocaleDateString(date, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }

    static formatToRelativeTime(date: PossibleDate) {
        const diffInSeconds = this.getTimeDifferenceInSecondsFromNow(date);

        let value: number;
        let unit: Intl.RelativeTimeFormatUnit;

        if (diffInSeconds < 60) {
            // less than 60 seconds
            value = diffInSeconds;
            unit = 'second';
        } else if (diffInSeconds < 3600) {
            // less than 60 minutes
            value = Math.floor(diffInSeconds / 60);
            unit = 'minute';
        } else if (diffInSeconds < 86400) {
            // less than 24 hours
            value = Math.floor(diffInSeconds / 3600);
            unit = 'hour';
        } else {
            // If more than 24 hours, return the full date.
            return this.formatToShortDate(date);
        }

        const rtf = new Intl.RelativeTimeFormat('en-US', { numeric: 'auto' });
        return rtf.format(-value, unit);
    }

    static formatToLocaleDateString(
        date: PossibleDate,
        options?: Intl.DateTimeFormatOptions,
    ): string {
        return this.toDateInstance(date).toLocaleDateString('en-US', options);
    }

    private static getTimeDifferenceInSecondsFromNow(date: PossibleDate): number {
        const now = new Date();
        const _date = this.toDateInstance(date);
        return Math.floor((now.getTime() - _date.getTime()) / 1000);
    }

    private static toDateInstance(date: PossibleDate): Date {
        return date instanceof Date ? date : new Date(date);
    }
}

export { DateUtils };
