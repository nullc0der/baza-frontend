import React, {Component} from 'react'
import classnames from 'classnames'

import s from './Footer.scss'

const FOOTER_LINKS = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms and Conditions", href: "#" },
    { label: "Donate", href: "#" },
    { label: "Code of Conduct", href: "#" }
];

export default class Footer extends Component {
    render(){
        const cx = classnames(s.container, 'app-footer bg-dark py-4')
        return (
            <div className={cx}>
                <div className='footer-inner text-center'>
                    <p className='footer-copyright-info'>&copy; 2018 Baza Foundation</p>
                    <ul className='list-inline'>
                        {
                            FOOTER_LINKS.map((x, i)=> (
                                <li className='list-inline-item' key={i}>
                                    <a className='footer-link' href={x.href}> {x.label} </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}