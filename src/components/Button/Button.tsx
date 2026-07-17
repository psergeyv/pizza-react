import st from './Button.module.css'
import { type ButtonProps } from './Button.props';
import cn from 'classnames';

function Button({children, className, appearence = 'btn-small', ...props}: ButtonProps) { 
	return (
		<>
			<button className={cn(st['button'], st['accent'], className, {
				[st['btn-small']]: appearence == 'btn-small',
				[st['btn-big']]: appearence == 'btn-big'
			})} {...props}>
                {children}
            </button>
		</>
	)
}

export default Button
