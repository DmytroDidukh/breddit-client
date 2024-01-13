class DateUtils {
    static formatToLocaleDateString(date: Date, options?: Intl.DateTimeFormatOptions) {
        return new Date(date).toLocaleDateString('en-US', options);
    }

    static formatToLongDate(date: Date) {
        return this.formatToLocaleDateString(date, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    static formatToShortDate(date: Date) {
        return this.formatToLocaleDateString(date, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }
}

export { DateUtils };
